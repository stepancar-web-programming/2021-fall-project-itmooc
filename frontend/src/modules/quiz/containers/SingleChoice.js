import React from 'react';

import { Question, Variant } from '../components';

export default function SingleChoice() {
    return (
        <>
            <Question question="С помощью какого тега в HTML создаются ссылки?" />
            <Variant contents={['<b>', '<a>', '<strong>', '<p>', '<i>', '<span>']} answer={1} />
        </>
    );
}
