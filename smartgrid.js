const smartgrid = require('smart-grid');

const settings = {
		filename: "smart-grid",
		outputStyle: "less",
		columns: 12,
		offset: "30px",
		mobileFirst: false,
		container: {
			maxWidth: "1170px",
			fields: "30px"
		},
		breakPoints: {
			lg: {
				width: "1230px",
			},
			md: {
				width: "992px",
				fields: "15px"
			},
			sm: {
				width: "768px"
			},
			xs: {
				width: "576px"
			}
		}
};

smartgrid('./src/less', settings);