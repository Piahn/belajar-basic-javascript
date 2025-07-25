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


module.exports = { mapDBToModel, SongsDBbyIdModel };
