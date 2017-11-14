import React from 'react'

export function CoordinateDataTable(coords) {
    //console.log('dataTableHTML');

    if (!coords) {
        return ''
    }

    return (
        <section>
            <h2>Your current position</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Latitude:</td>
                        <td>{coords.lat}</td>
                    </tr>
                    <tr>
                        <td>Longitude:</td>
                        <td>{coords.lng}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}
