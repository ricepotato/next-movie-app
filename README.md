# Next Movie App 😀

https://next-movie-app-olive.vercel.app/movie/ 👈 click here to check this app

## React CSR App

Github : https://github.com/ricepotato/nomflix

gh pages: https://ricepotato.github.io/nomflix/#/ 👈 click here to check app

## 🛠 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## ✨ Environment Variables

To run this project, you will need to add the following environment variables to your .env file

use [www.themoviedb.org](https://www.themoviedb.org/?language=ko) API

```bash
API_KEY=YourThemovedbAPIKey
```

## 🚀 Deployment (GAE)

### To deploy this project run

```bash
make deploy
```

## API Reference

[www.themoviedb.org](https://www.themoviedb.org/?language=ko) API

### Movies API

#### Get upcoming movies

```http
  GET /api/movies/upcoming
```

ex) https://movie-app-342615.uc.r.appspot.com/api/movies/upcoming

#### Get now_playing movies

```http
  GET /api/movies/now_playing
```

ex) https://movie-app-342615.uc.r.appspot.com/api/movies/now_playing

#### Get popular movies

```http
  GET /api/movies/popular
```

ex) https://movie-app-342615.uc.r.appspot.com/api/movies/popular

#### Get movie by movie ID

```http
  GET /api/movies/:id
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Id of movie item to fetch |

ex) https://movie-app-342615.uc.r.appspot.com/api/movies/634649

### TV Shows API

#### Get top raated tv shows

```http
  GET /api/tv/top_rated
```

ex) https://movie-app-342615.uc.r.appspot.com/api/tv/top_rated

#### Get top popular tv shows

```http
  GET /api/tv/popular
```

ex) https://movie-app-342615.uc.r.appspot.com/api/tv/popular

#### Get top airing_today tv shows

```http
  GET /api/tv/airing_today
```

ex) https://movie-app-342615.uc.r.appspot.com/api/tv/airing_today

#### Get tv show by ID

```http
  GET /api/tv/:id
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. Id of TV show item to fetch |

ex) https://movie-app-342615.uc.r.appspot.com/api/tv/85552
