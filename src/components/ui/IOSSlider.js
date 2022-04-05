import Slider from "@mui/material/Slider";
import { styled } from '@mui/material/styles';

const iOSBoxShadow =
		'0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
const IOSSlider = styled(Slider)(({ theme }) => ({
	color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
	height: 2,
	padding: '15px 0',
	margin: '0 1.5rem',
	'& .MuiSlider-thumb': {
		height: 28,
		width: 28,
		backgroundColor: '#fff',
		boxShadow: iOSBoxShadow,
		'&:focus, &:hover, &.Mui-active': {
			boxShadow:
					'0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				boxShadow: iOSBoxShadow,
			},
		},
	},
	'& .MuiSlider-valueLabel': {
		fontSize: 12,
		fontWeight: 'normal',
		top: -6,
		backgroundColor: 'unset',
		color: theme.palette.text.primary,
		'&:before': {
			display: 'none',
		},
		'& *': {
			background: 'transparent',
			color: theme.palette.mode === 'dark' ? '#fff' : '#000',
		},
	},
	'& .MuiSlider-track': {
		border: 'none',
	},
	'& .MuiSlider-rail': {
		opacity: 0.5,
		backgroundColor: '#bfbfbf',
	},
	'& .MuiSlider-mark': {
		backgroundColor: '#bfbfbf',
		height: 8,
		width: 1,
		'&.MuiSlider-markActive': {
			opacity: 1,
			backgroundColor: 'currentColor',
		},
	},
}));

export default IOSSlider;