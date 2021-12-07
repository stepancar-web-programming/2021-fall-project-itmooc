import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { varBounceIn } from './variants';

MotionComponent.propTypes = {
    variant: PropTypes.object,
    children: PropTypes.node
};

export default function MotionComponent({ variant = varBounceIn, children }) {
    return (
        <motion.div animate={variant.animate} exit={variant.exit}>
            {children}
        </motion.div>
    );
}
