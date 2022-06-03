const { model } = require("mongoose");
const Diary = require("./diary-mongo-model");

const sendError = (res, e, genericError) => {
  if (e._message != null) {
    res.status(500).send({ result: [], error: [e.errors.name.message] });
  } else if (e.toString().includes("E11000") > 0) {
    res.status(500).send({
      result: [],
      error: ["What you are trying to create already exists"],
    });
  } else {
    res.status(500).send({ result: [], error: [genericError] });
  }
};

const findAll = async (req, res) => {
  try {
    const list = await Diary.find().exec();
    res.status(200).send({ result: list, error: [] });
  } catch (e) {
    console.error(`[ERROR] Cannot get all diaries ${e}`);
    sendError(res, e, "Cannot get all diaries");
  }
};

const createOne = async (req, res) => {
  const { name } = req.body;
  try {
    const doc = await Diary.create([{ name: name }]);

    res.status(201).send({ result: doc, error: [] });
  } catch (e) {
    console.error(`[ERROR] Cannot create ${e}`);
    sendError(res, e, "Something went wrong in creating the diary");
  }
};

const updateOne = async (req, res) => {
  const { name } = req.body;
  const idDiary = req.params.idDiary;

  if (name === "") sendError(res, "", "Name is required"); //Las validaciones no se ejecutan en el Update
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
    sendError(res, e, "Cannot updated diary");
  }
};

const deleteOne = async (req, res) => {
  const idDiary = req.params.idDiary;
  try {
    const doc = await Diary.findOneAndDelete({ _id: idDiary }, { new: true });
    if (doc === null) {
      return res
        .status(404)
        .send({ result: [], error: [`Not exist diary with id ${idDiary}`] });
    }

    res.status(200).send({ result: doc, error: [] });
  } catch (e) {
    console.error(`[ERROR] Cannot delete Diary ${idDiary} ${e}`);
    sendError(res, e, `Cannot delete diary  ${idDiary}`);
  }
};

module.exports = { findAll, createOne, deleteOne, updateOne };
