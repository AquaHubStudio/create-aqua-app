import figlet from 'figlet';

export const printTitle = () => {
    const text = figlet.textSync('CREATE AQUA APP', { font: 'Small' })
    console.log(text)
}