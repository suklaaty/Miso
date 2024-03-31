# Miso
Miso in meant to be a simple and fast alternative to other website analytics that purposely handicap the functionality and accuracy of the data.

## Required enviroment variables
#### DATABASE_URL
> This should be your postgres url. e.g. postgres://USERNAME:PASSWORD@HOSTNAME:PORT/DATABASENAME
#### AUTH_EXPIRATION
> Set how long a login session should last (in days). Recommened to be `7`
#### AUTH_SECRET
> This used to create login sessions. Minimun charatcer length is 12 but 36 is recommended. Changing it will invalidate all previous sessions. CHANGE THIS TO A UNIQUE VALUE.

## Additional enviroment variables
#### COLLECT_IP
> Set to `0` to stop collecting IP Addresses. It is not recommended to change this after collecting analytics as it could cause discrepencies. For securitty purposes this is enabled by default
#### COLLECT_BOT
> Set to `1` to start collecting events from bots. For performance reasons this is disabled by default.
#### AUTH_ALLOW_REGISTRATION
> Set to `1` to allow registrations. Registrations are disabled by default

## Default credentials
```
Email: admin@admin.com
Password: Password123!
```
Once you login, change the default email and password immediately