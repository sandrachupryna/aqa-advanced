import chalk from 'chalk';

// Nest styles of the same type even (color, underline, background)
console.log(
  chalk.cyanBright.strikethrough(
    'I am a cyan line ' +
      chalk.yellow.overline.underline.bold.italic('with a yellow substring') +
      ' that becomes cyan again!'
  )
);

console.log(
  chalk.magenta.strikethrough(
    'I am a magenta line ' +
      chalk.reset.yellow.overline.underline.bold.italic(
        'with a yellow substring'
      ) +
      " that doesn't become magenta again because of the 'reset'!"
  )
);

console.log(
  chalk.bgRed.green.bold(
    'I am a green line on a red background, but my color is white because of the background property!'
  )
);

console.log(
  chalk.bgHex('#b522baff')(
    'I am a text with a bg color set using a hex code!',
    chalk.dim(' (and I am nested dimmed part)'),
    'Wow!'
  )
);
