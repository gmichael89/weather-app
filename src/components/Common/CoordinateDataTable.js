import React from 'react'

export default function CoordinateDataTable(coords) {

    const { lat, lng } = coords;

    if (!lat) {
        return ''
    }

    return (
        <section>
            <h2>Your current position</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Latitude:</td>
                        <td>{lat}</td>
                    </tr>
                    <tr>
                        <td>Longitude:</td>
                        <td>{lng}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}
