import React from 'react';
import PropTypes from 'prop-types';

import { Question, Variant } from '../components';
import { MotionComponent } from '../../core/animate';

export default function SingleChoice({ question, variants, answer, page, setPage }) {
    return (
        <>
            {/* <MotionComponent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}> */}
            <Question question={question} />
            <Variant contents={variants} answer={answer} onSubmit={() => setPage(page + 1)} />
            {/* </MotionComponent> */}
        </>
    );
}

SingleChoice.propTypes = {
    question: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.string),
    answer: PropTypes.number,
    setPage: PropTypes.func,
    page: PropTypes.number
};
