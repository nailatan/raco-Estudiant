const { model } = require("mongoose");
const Diary = require("./diary-mongo-model");
const Event = require("../event-mongo/event-mongo-model");

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

const findAll = async (req, res, next) => {
  try {
    const list = await Diary.find().exec();
    res.status(200).send({ result: list, error: [] });
  } catch (e) {
    next(e);
  }
};

const findOne = async (req, res, next) => {
  const idDiary = req.params.idDiary;

  try {
    const list = await Diary.find({ _id: idDiary }).exec();
    res.status(200).send({ result: list, error: [] });
  } catch (e) {
    next(e);
  }
};

const createOne = async (req, res, next) => {
  const { name } = req.body;
  try {
    const doc = await Diary.create([{ name: name }]);

    res.status(201).send({ result: doc, error: [] });
  } catch (e) {
    next(e);
  }
};

const updateOne = async (req, res, next) => {
  const { name } = req.body;
  const idDiary = req.params.idDiary;

  try {
    if (name === "") {
      throw new Error("Name is required");
    } //Las validaciones no se ejecutan en el Update

    const doc = await Diary.findOneAndUpdate(
      { _id: idDiary },
      { name: name },
      { new: true }
    );
    if (doc === null) {
      throw new Error(`Cannot updated diary`);
    } else {
      res.status(200).send({ result: { doc }, error: [] });
    }
  } catch (e) {
    next(e);
  }
};

const deleteOne = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  try {
    const doc = await Diary.findOneAndDelete({ _id: idDiary }, { new: true });
    if (doc === null) {
      throw new Error(`Not exist diary with id ${idDiary}`);
    } else {
      res.status(200).send({ result: doc, error: [] });
    }
  } catch (e) {
    next(e);
  }
};

const findEvents = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  try {
    const list = await Event.find({ idDiary: idDiary })
      .populate("idDiary")
      .exec();
    res.status(200).send({ result: list, error: [] });
  } catch (e) {
    next(e);
  }
};

const createDiaryEvent = async (req, res, next) => {
  const idDiary = req.params.idDiary;

  console.log("CreateDiaryEvent");
  const event = req.body;
  event.idDiary = idDiary;
  try {
    const doc = await Event.create([event]);

    res.status(201).send({ result: doc, error: [] });
  } catch (e) {
    next(e);
  }
};

const updateDiaryEvent = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  const idEvent = req.params.idEvent;
  const { name, description, startDate, endDate } = req.body;
  try {
    const doc = await Event.findOneAndUpdate(
      { _id: idEvent },
      {
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
      },
      { new: true }
    );
    if (doc === null) {
      throw new Error(`Cannot updated event`);
    } else {
      res.status(200).send({ result: { doc }, error: [] });
    }
  } catch (e) {
    next(e);
  }
};

const deleteDiaryEvent = async (req, res, next) => {
  const idEvent = req.params.idEvent;
  try {
    const doc = await Event.findOneAndDelete({ _id: idEvent }, { new: true });
    if (doc === null) {
      throw new Error(`Not exist event with id ${idEvent}`);
    } else {
      res.status(200).send({ result: doc, error: [] });
    }
  } catch (e) {
    next(e);
  }
};
const findOneEvent = async (req, res, next) => {
  const idEvent = req.params.idEvent;
  try {
    const list = await Event.find({ _id: idEvent }).populate("idDiary").exec();
    res.status(200).send({ result: list, error: [] });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
  updateOne,
  findEvents,
  createDiaryEvent,
  updateDiaryEvent,
  deleteDiaryEvent,
  findOneEvent,
};
