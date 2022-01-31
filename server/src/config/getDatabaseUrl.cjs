const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/character-ranker_development",
      test: "postgres://postgres:postgres@localhost:5432/character-ranker_test",
      e2e: "postgres://postgres:postgres@localhost:5432/character-ranker_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
