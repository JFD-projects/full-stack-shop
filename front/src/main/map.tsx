import React from 'react';

interface IMap { }

const Map: React.FC<IMap> = () => {

    return <>
        <div>
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa100b608a0a6111496e78829edd1e4f103a3bb5392f2c5f3a10738f191b18e5f&amp;source=constructor" width="603" height="456" title='123'></iframe>
        </div>
    </>;
};

export default Map;