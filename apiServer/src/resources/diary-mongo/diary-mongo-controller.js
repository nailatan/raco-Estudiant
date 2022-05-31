const { model } = require("mongoose");
const Diary = require("./diary-mongo-model");

const findAll = async (req, res) => {
  try {
    const list = await Diary.find().exec();
    res.status(200).send({ result: list, error: [] });
  } catch (e) {
    console.error(`[ERROR] Cannot get all diaries ${e}`);
    res.status(500).send({ result: [], error: ["Cannot get all diaries"] });
  }
};

const createOne = async (req, res) => {
  const { name } = req.body;
  try {
    const doc = await Diary.create([{ name: name }]);

    res.status(201).send({ result: doc, error: [] });
  } catch (e) {
    console.error(`[ERROR] Cannot get all diaries ${e}`);
    res.status(500).send({ result: [], error: ["Cannot create diary"] });
  }
};

const updateOne = async (req, res) => {
  const { name } = req.body;
  const idDiary = req.params.idDiary;

  try {
    const doc = await Diary.findOneAndUpdate(
      { _id: idDiary },
      { name: name },
      { new: true }
    );
    if (doc === null) {
      return res
        .status(404)
        .send({ result: [], error: [`Cannot updated diary`] });
    }

    res.status(200).send({ result: { doc }, error: [] });
  } catch (e) {
    console.error(`[ERROR] Cannot update diary ${e}`);
    res.status(500).send({ result: [], error: ["Cannot updated diary"] });
  }
};

const deleteOne = async (req, res) => {
  const idDiary = req.params.idDiary;
  try {
    if (idDiary === null || idDiary === "") {
      return res
        .status(404)
        .send({ result: [], error: [`Not exist diary with id ${idDiary}`] });
    }
    const doc = await Diary.findOneAndDelete({ _id: idDiary }, { new: true });
    if (doc === null) {
      return res
        .status(404)
        .send({ result: [], error: [`Not exist diary with id ${idDiary}`] });
    }

    res.status(200).send({ result: doc, error: [] });
  } catch (e) {
    console.error(`[ERROR] Cannot delete Diary ${idDiary} ${e}`);
    res
      .status(500)
      .send({ result: [], error: [`Cannot delete diary  ${idDiary}`] });
  }
};

module.exports = { findAll, createOne, deleteOne, updateOne };
