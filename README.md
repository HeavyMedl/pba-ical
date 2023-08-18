![ball and pin](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFUUlEQVR4nOVba6gVVRT+7jUNIXqnaDezrv7RiIIE6eUr0l7ojTSqa0VgloZBRNqLsJKCNHsoSURF9COtFMqKIEMthMjIiKzurYwsJSmJSm7p9Z5YsCa+FnvP7Jkzc86c6YPFgdlr5uxvz957PfYaoPXRDmASgDsBLAOwEMAY/E8wCcBXAGoO2QBgJCqMWQAOeshH8h2AUaggTgbwGxH9HcALAB4F8A6AAWrbosukUnicCPYCOMW0X25mxwxUDLuI3EUenadI51lUCEMAHFZif8VM70tpADahQmgH0K/EDgE4wqN3BQ3ARlQM3xO5Mz0695LO06gYXiNyN3l0NpDODagY7iZyqz06u0lnPCqGi4ncR4724dR+IGafaFkcT85OH4DBpv0yGoAPUFF8SyTPNm0PUNtKVBTriOQ80/YGtXU3016fCmAagBsBLACwGMCtuitPURe2LePz7yKSa0zbT9Q2Dg3ECACL9A3sT4jUItkHYL0OzEkp/msaPeNj04fo+h+NCITaAFwC4F3y0LLKIfXapgb873HkEv/qsRBbUTCmAthRJ2mfiHk7N+H/V2rUt5SuzaNnvFgU8RMBrHV0ul8Dj/m6Mz9X5yAMaJx/TMa94Ymi0lA/mo72qb/dYXRPyGk2iMmbENi/2+g+eQG5Yq4jDbVOMzQu3JLjkpBB7gro41VF7QGLTKrpFwBzHHqjdBpuL2Bf6I8JfiKcbtzgo/Igf70h3+tIPXcCeD4gUZnHIHQlWCX2EsUHqQtTDKntxl4P0jfeVzBxuxzi9oT7SfezOpwtCNE99LAeQ16Cks0NJM7yDYCjPf0eYV6IJEkzYT09ZL+uL17rO5tEPhJZcj6sIT15Sakx3fzZ1ca8fdlk8jXdlyZ6+t9JnqLIGWnItwP4gm5+xaz5LSUgH8m2GB5vkt4zaQagi27820z9e0pA2spkD48ZJjAK9ii30o1P0vXRmouvlUzkTftmcg/piWOWiNFk8+V3LLW9VAKyLjmo8UlSbCARayIW0w3v0/WRGq7WSioSgLkwxgzUsUkD8B7dsIqu31cCknHyagynz0NTZIMB/Gls/0wAV2rSoVZi+TnG43uQ9CSM92JcCYjUI76KkImkI6G8FzOb2PmH1EydY4KZNHqSq3DhSGO9bD3Bv1jYJPK9ZvrOzagXt763kd5sn9ISUvoawGnqBPW0yABIZjkufxjpLfcpLSWlx+j68gbMgmVqoiZocVMWvTsSchpJjhPsDOhUKXoG5CVxM+B80hOz6AQnFFtR4vaADtITU+/ErBKQqEd8ViCKC9gSOE+hxpeABMseze1zWBsnvuy0q7TGWTQxRDOpzSYeTVOu8lwVcMaYlPvjDJb4EU5sKgH5KPnqq/pyyetIxiekf4FPqSwJjwNmBqyuwwJE+JD05RDViU5zBtBM2asJmbcS9CRMHxYwAJzBlkLKILexFeRthIFPqy4MPV9rBZFiiRCwQ3dWnOIg9QRrLSBcHZKEvXQfJ3qdSNp1yyADcbu5QZs5LZKzjURsLAHJOHkZ4egwH1gEnRcON9OmTLI79C3SIW90r/gDwZieQ/FT3iKHNeelIQHgZs9JVxDml4A0r/trkR4rTFotNZaUwEE6rCF7FrBvI1nuTJjT4EIIFgllr8nY76G6bKIZFOI1ejFZI69Gkt+Xwtz5+hw9S47168YwT51gUabOd+4XikfiviBr11RSt8c2SkR2u54ZWik6Ztjs+d80ssJkgiTr9R90U+N1jgHwfZvbirLDVTzdnTAAP5Sg43nIp76UWZsSF9vqWgLyWdrD+l1uK4p8PSJVYs6y+X8Azs8GMFyHALMAAAAASUVORK5CYII= 'ball and pin')

# pba-ical

This program scrapes all of the [listed PBA tournaments](https://www.pba.com/tournament-schedule) to create a generic model, outputted as `data/pba-tournaments.json`, which is then used to generate an iCalendar (`pba-tournaments.ics`) reflecting PBA tournaments.

![Google Calendar](img/google-calendar.png)

## Usage

### Adding the calendar

Navigate to your calendar settings and add a calendar "from URL". I recommend adding the calendar this way instead of importing all of the individual events from the `pba-tournaments.ics` as it's more flexible to unsubscribe and toggle on and off.

![Google Calendar](img/add-calendar.png)

I'm using `jsdelivr` as a CDN for the ICS file which allows me to version each "release".

Use the latest release's semver:

https://cdn.jsdelivr.net/gh/HeavyMedl/pba-ical@1.0.0/pba-tournaments.ics

Feel free to fork this repo and host your own!

### Running the scraper and ICS generator

Clone or fork the repository

```sh
$ git clone https://github.com/HeavyMedl/pba-ical.git && cd pba-ical/
$ npm ci
$ npm run execute:all
```
