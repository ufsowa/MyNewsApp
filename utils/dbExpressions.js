exports.regexQuery = (field, searchText) => {
    return { [field]: { $regex: `${searchText}`, $options: 'i' } };
};
  