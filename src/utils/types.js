import PropTypes from 'prop-types';

export const INGREDIENT_OBJECT = {
  proteins: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
}