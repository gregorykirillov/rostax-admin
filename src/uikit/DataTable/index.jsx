import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const DataTableCell = ({children}) => (
    <td className={styles.cell}>
        {children}
    </td>
);

const DataTableRow = ({
    data,
    children,
    fields,

    handleSelect,
}) => {
    let cells;

    if (data && fields) {
        cells = fields.map(
            ({field}) => (
                <DataTableCell key={field}>
                    {data[field]}
                </DataTableCell>
            ),
        );
    } else if (children) {
        cells = children;
    }

    return (
        <tr
            className={styles.row}
            onClick={data && handleSelect ? () => handleSelect(data.id) : undefined}
        >
            {cells}
        </tr>
    );
};

const DataTable = ({
    dataList,
    className,
    fields,

    handleRowSelect,
}) => (
    <table className={classnames(className, styles.table)}>
        <thead className={styles.thead}>
            <DataTableRow>
                {fields?.map(
                    ({name, field}) => (
                        <DataTableCell key={field}>
                            {name}
                        </DataTableCell>
                    ),
                )}
            </DataTableRow>
        </thead>

        <tbody>
            {dataList?.map(
                dataItem => (
                    <DataTableRow
                        key={dataItem.id}
                        fields={fields}
                        data={dataItem}

                        handleSelect={handleRowSelect}
                    />
                ),
            )}
        </tbody>
    </table>
);


export default React.memo(DataTable);
