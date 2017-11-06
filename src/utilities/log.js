const logTextPadding = 'padding: 3px;';
const logTextColour = 'color: #fff;';
const logTextBackground = 'background: #3d3ac6;';
const logTextBackgroundAlt = 'background: #34a3a3;';

export default (scope, fnName = '', type = 'Render', inputValue = '') => {

    let logTheme = `${logTextPadding}${logTextColour}`;

    switch (type){
        case 'Event':
            logTheme += logTextBackgroundAlt;
            break;
        default:
            logTheme += logTextBackground;
    }

    console.log(`%c ${scope.constructor.name}::${inputValue} ${fnName} `, logTheme);
}
