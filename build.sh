wget --output-document "original.zip" 'https://clients2.google.com/service/update2/crx?response=redirect&os=linux&arch=x86-64&os_arch=x86-64&nacl_arch=x86-64&prod=chromecrx&prodchannel=unknown&prodversion=9999.0.9999.0&acceptformat=crx2,crx3&x=id%3Dekldadcjhbmljcefnilihgagmnmmlfcd%26uc'
yes|unzip original.zip -d 'files/'
sed -i 's/chrome/browser/g' files/*.*
yes|cp -f overrides/* files/
# remove prev build ig
mkdir build
rm build/leetrooms.zip
yes|zip -jr build/leetrooms.zip files/*
rm original.zip