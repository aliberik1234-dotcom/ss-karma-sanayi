const { exec } = require('child_process');
exec('cd "C:\\Users\\Casper\\Desktop\\Dosyalar\\Dosyalar\\Karma Sanayi APP Dosyalar\\ss-karma-sanayi" && node_modules\\.bin\\tsc --noEmit', (error, stdout, stderr) => {
  if (error) {
    console.error('ERROR:', error.message);
    console.error('STDERR:', stderr);
    process.exit(1);
  }
  console.log('STDOUT:', stdout);
  if (stderr) console.error('STDERR:', stderr);
  console.log('TypeScript compilation completed successfully.');
});