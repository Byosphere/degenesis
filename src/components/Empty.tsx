import React from 'react';
import T from 'i18n-react';

export default function Empty() {
    return (
        <span style={{
            width: '100%',
            textAlign: 'center',
            display: 'block',
            opacity: 0.5,
            marginBottom: '16px'
        }}>{T.translate('generic.empty')}</span>
    );
}