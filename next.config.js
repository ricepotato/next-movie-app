/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;
const baseUrl = "https://api.themoviedb.org/3/";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'image.tmdb.org'],
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: "/api/tv/top_rated",
        destination: `${baseUrl}tv/top_rated?api_key=${API_KEY}`,
      },
      {
        source: "/api/tv/popular",
        destination: `${baseUrl}tv/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/tv/airing_today",
        destination: `${baseUrl}tv/airing_today?api_key=${API_KEY}`,
      },
      {
        source: "/api/tv/:id",
        destination: `${baseUrl}tv/:id?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies",
        destination: `${baseUrl}movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `${baseUrl}movie/:id?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/now_playing",
        destination: `${baseUrl}movie/now_playing?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/upcoming",
        destination: `${baseUrl}movie/upcoming?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/popular",
        destination: `${baseUrl}movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
}

module.exports = nextConfig
