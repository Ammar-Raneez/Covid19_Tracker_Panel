import React from 'react';
import './Table.css';
import numeral from 'numeral'

function Table({countries, theme}) {
    return (
        <div className={`table ${theme}`}>
            {countries.map(({ country, cases }) => {
                return (
                    <tr className={theme}>
                        <td className={theme}>{country}</td>
                        <td className={theme}><strong>{numeral(cases).format("0,0")}</strong></td>
                    </tr>
            )})}
        </div>
    )
}

export default Table
