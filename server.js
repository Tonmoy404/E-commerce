(()=>{
	const path = require('path');

	const config = require(path.join(process.cwd(), './Server/src/config/index'));
	config.initEnvironmentVariables();

	const app = require(path.join(process.cwd(), './Server/src/config/lib/app'));
	app.start();
})();