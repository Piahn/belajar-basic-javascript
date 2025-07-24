const mapDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});

const SongsDBbyIdModel = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

const albumDBToModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

module.exports = { mapDBToModel, SongsDBbyIdModel, albumDBToModel };
