require('dotenv').config();
const { Router, response, request } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Videogames, Genres } = require('../db');
const { API_KEY } = process.env;
const { Op } = require('sequelize');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (request, response) => {
  try {
    return response.status(200).send('Homepage!');
  } catch (errorMessage) {
    console.log(errorMessage);
  }
});

router.get('/videogames', async (request, response) => {
  const { name } = request.query;

  try {
    if (name) {
      const gameInDatabase = await Videogames.findAll({
        where: {
          name: { [Op.iLike]: '%' + name + '%' },
        },
        include: Genres,
      });
      let fullGameInDatabase;

      if (gameInDatabase) {
        fullGameInDatabase = gameInDatabase.map((videogame) => {
          return {
            image: videogame.image,
            name: videogame.name,
            genres: videogame.genres.map((genre) => genre.name),
            id: videogame.id,
            rating: videogame.rating,
          };
        });
      }

      const searchedGameFromApi = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
      );

      const searchedGameUrl = searchedGameFromApi.data.results;

      if (searchedGameUrl.length) {
        const fullGameInApi = searchedGameUrl.flat().map((videogame) => {
          return {
            image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map((genre) => genre.name),
            id: videogame.id,
            rating: videogame.rating,
          };
        });

        return response
          .status(200)
          .send(fullGameInDatabase.concat(fullGameInApi).slice(0, 15));
      }
    } else {
      let resultsToReturn = [];
      let rawgApi = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=33`;

      for (let index = 0; index < 3; index++) {
        let videogames = (await axios.get(rawgApi)).data;
        let gameInfo = videogames.results.map((videogame) => {
          return {
            image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map((genre) => genre.name),
            id: videogame.id,
            rating: videogame.rating,
          };
        });
        rawgApi = videogames.next;
        resultsToReturn = resultsToReturn.concat(gameInfo);
      }

      let databaseVideogames = await Videogames.findAll({
        include: Genres,
      });
      let dbGamesToConcat = databaseVideogames.map((videogame) => {
        return {
          image: videogame.image,
          name: videogame.name,
          genres: videogame.genres.map((genre) => genre.name),
          id: videogame.id,
          rating: videogame.rating,
        };
      });

      resultsToReturn = dbGamesToConcat.concat(resultsToReturn);
      return response.status(200).send(resultsToReturn);
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

router.get('/videogame/:idVideogame', async (request, response) => {
  const { idVideogame } = request.params;

  try {
    let gameToReturn;

    if (idVideogame.length > 15) {
      let searchedGameByDatabase = await Videogames.findAll({
        where: {
          id: idVideogame,
        },
        include: Genres,
      });

      gameToReturn = searchedGameByDatabase.map((videogame) => {
        return {
          image: videogame.image,
          name: videogame.name,
          genres: videogame.genres.map((genre) => genre.name),
          description: videogame.description,
          releaseDate: videogame.releaseDate,
          rating: videogame.rating,
          platforms: videogame.platforms,
        };
      });
    } else {
      let searchedGameByApi = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      let videogame = searchedGameByApi.data;

      gameToReturn = {
        image: videogame.background_image,
        name: videogame.name,
        genres: videogame.genres.map((genre) => genre.name),
        description: videogame.description_raw,
        releaseDate: videogame.released,
        rating: videogame.rating,
        platforms: videogame.platforms.map((plat) => plat.platform.name),
      };
    }

    return response.status(200).send(gameToReturn);
  } catch {
    response.status(404).send('Oops! The ID was not found.');
  }
});

router.get('/genres', async (request, response) => {
  try {
    let genresFromDatabase = await Genres.findAll();

    if (genresFromDatabase.length > 0)
      return response.status(200).send(genresFromDatabase);
    else {
      const genresFromApi = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );

      let genresInfo = genresFromApi.data.results.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      });

      genresInfo.forEach((genre) => Genres.create(genre));
      return response.status(200).send(genresInfo);
    }
  } catch {
    response.status(400).send('Something went wrong! :(');
  }
});

router.post('/videogame', async (request, response) => {
  const { name, description, releaseDate, rating, genres, platforms } =
    request.body;

  try {
    const newGame = await Videogames.create({
      image:
        'https://i.pinimg.com/564x/1e/1e/49/1e1e4996b0f17197b81e578450462c14.jpg',
      name,
      description,
      releaseDate,
      rating,
      platforms: platforms,
    });

    genres.forEach(async (genre) => {
      let gameGenres = await Genres.findOne({ where: { name: genre } });
      await newGame.addGenre(gameGenres);
    });

    response.status(200).send(newGame);
  } catch {
    response.status(400).send('Sorry! The videogame was not created.');
  }
});

module.exports = router;
