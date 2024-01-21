import { Open_Sans } from 'next/font/google';
// import localFont from 'next/font/local'

// define your variable fonts
// const inter = Inter()
// const lora = Lora()
// const open_sans = Open_Sans()
const open_Sans_300 = Open_Sans({ subsets: ['latin'], weight: '300' });
const open_Sans_400 = Open_Sans({ subsets: ['latin'], weight: '400' });
// define 2 weights of a non-variable font
// const sourceCode300 = Source_Sans_2({ weight: '400' })
// const sourceCode400 = Source_Sans_2({ weight: '700' })
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export { open_Sans_300, open_Sans_400 };
