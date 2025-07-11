import { LexUnit, LexUnits } from '../interfaces/types';

interface GoogleSheetParams {
    id: string;
    gid: string;
}

interface GoogleSheetCell {
    v?: string;
    f?: string;
}

interface GoogleSheetRow {
    c: Array<GoogleSheetCell>;
}

interface AbstractUnit {
    [key: string]: string;
}

const getCellData = (cell: GoogleSheetCell): string => {
    let value: string;

    try {
        value = cell.f ? cell.f : cell.v;
    } catch (e) {
        value = 'SELL_KEY_UNKNOWN';
    }

    return value;
};

export const getGoogleSheetData = <T>({
    id,
    gid,
}: GoogleSheetParams): Promise<Array<T>> => {
    const url =
        'https://docs.google.com/spreadsheets/d/' +
        id +
        '/gviz/tq?tqx=out:json&tq&gid=' +
        gid;

    return fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const txt = data.substring(47).slice(0, -2);
            const json = JSON.parse(txt).table;
            const parsedTable: Array<AbstractUnit> = [];
            let rowHeaders: Array<keyof AbstractUnit>;

            if (json.parsedNumHeaders === 1) {
                rowHeaders = json.cols.map(
                    (col: { label: string }) => col.label
                );
            } else {
                rowHeaders = json.rows[0].c.map((data: GoogleSheetCell) =>
                    getCellData(data)
                );
                json.rows.shift();
            }

            console.log(json);

            json.rows.forEach((row: GoogleSheetRow) => {
                const dataUnit = {} as AbstractUnit;

                rowHeaders.forEach(
                    (headerName: keyof AbstractUnit, columnIndex: number) => {
                        dataUnit[headerName] = getCellData(row.c[columnIndex]);
                    }
                );

                parsedTable.push(dataUnit);
            });

            console.log(parsedTable);

            return parsedTable as Array<T>;
        });
};

export const loadLibrary = (): Promise<LexUnits> => {
    const librarySheetParams: GoogleSheetParams = {
        id: '18nlWgs1VKr5tLjELq3rylVp53WZZLuElKDezNSptr3g',
        gid: '0',
    };

    return getGoogleSheetData<LexUnit>(librarySheetParams);
};
