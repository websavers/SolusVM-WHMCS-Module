This fork of the SolusVM module has the following changes (and prob a few more):
- Fix for WHMCS 8.13 to ensure $token is included with client area requests (prevents user logout)
- Eliminates old template file to avoid dev confusion
- Replace old serveraction GET request with documented modop
- Encrypt server root passwords in database, auto decrypt as required. (Note: we attempt to handle this correctly, but existing unencrypted passwords may not always display correctly. Resaving the field with the correct password will resolve this, as will changing the root password).
- Add Tun/Tap management to admin and client area
- Add OS/System Template changing capabilities to both the admin and client area

[SolusVM WHMCS Module Documentation](https://docs.solusvm.com/display/BET/SolusVM+WHMCS+billing+module)
