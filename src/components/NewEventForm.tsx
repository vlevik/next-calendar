import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import 'bulma';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { close } from '@/redux/newEventFormSlice';
import { createNewEvent } from '@/services';
import { NewEvent } from '@/types/events';
import { setEvents } from '@/redux/eventsSlice';

const formSchema = yup.object({
  name: yup.string().min(3, 'Min length is 3 letters').required('Name is required!'),
  start: yup.string().required('Start time is required!'),
  duration: yup.number().min(15, 'Min duration is 15 minutes').required('Duration is required!'),
});

export default function NewEventForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [loading, setLoading] = React.useState(false);

  const { handleSubmit, values, handleChange, errors, touched, resetForm, setErrors } = useFormik<{
    name: string;
    start: string;
    duration: number;
  }>({
    initialValues: {
      name: '',
      start: '',
      duration: 0,
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let startHours = 0;

        values.start.split(':').forEach((val: string, i: number) => {
          if (i === 0) {
            startHours += (+val - 8) * 60;
          }

          if (i === 1) {
            startHours += +val;
          }
        });

        if (startHours + values.duration > 540) {
          setErrors({
            start: 'Your event lasts after 17:00!',
          });
        } else {
          const newEvent: NewEvent = {
            name: values.name,
            start: startHours,
            duration: values.duration,
          };

          if (!user) {
            return;
          }
          const data = await createNewEvent(user._id.toString(), newEvent);

          console.log(data);

          dispatch(setEvents(data.user.events));
          dispatch(close());

          resetForm();
        }
      } catch (err: any) {
        setErrors({
          name: err.message,
        });
      } finally {
        setLoading(false);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <div className="box" style={{ height: '100%' }}>
      <h1 className="title">Create new event form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              id="name"
              name="name"
              className={cn('input', { 'is-danger': errors.name && touched.name })}
              type="text"
              placeholder="Enter name of event"
              onChange={handleChange}
              value={values.name}
            />
            {errors.name && touched.name && <p className="help is-danger">{errors.name}</p>}
          </div>
        </div>
        <div className="field">
          <label className="label">Start</label>
          <div className="control">
            <input
              id="start"
              name="start"
              className={cn('input', { 'is-danger': errors.start && touched.start })}
              type="time"
              placeholder="Enter start time of event"
              min="08:00"
              max="17:00"
              onChange={handleChange}
              value={values.start}
            />
            {errors.start && touched.start && <p className="help is-danger">{errors.start}</p>}
          </div>
        </div>
        <div className="field">
          <label className="label">Duration</label>
          <div className="control">
            <input
              id="duration"
              name="duration"
              className={cn('input', { 'is-danger': errors.duration && touched.duration })}
              type="number"
              placeholder="Enter duration of event"
              value={values.duration}
              onChange={handleChange}
            />
            {errors.duration && touched.duration && <p className="help is-danger">{errors.duration}</p>}
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button disabled={loading} className={cn('button is-link', { 'is-loading': loading })}>
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={() => dispatch(close())}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
