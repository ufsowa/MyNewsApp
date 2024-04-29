const Add = require('../models/add.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Add.find().populate('author'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Add.countDocuments();  //  count all items in collection
      const rand = Math.floor(Math.random() * count);
      const item = await Add.findOne().skip(rand);  //  skip number of items from the collection
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const item = await Add.findById(req.params.id).populate('author');   // no need ObjectId conversion, mongoose do it underneeth 
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addItem = async (req, res) => {
    try {
      const { title, address, price,  content, image, publishedDate } = req.body;

      // check if Add is already reserved
      const isReserved = await Add.exists( { title } );
      if(isReserved){
        res.status(409).json({message: 'The title is already taken...'})
      } else {
        if( title && address && price && content && image && publishedDate) {
          const newItem = new Add({ title, address, price, content, image, publishedDate, author: '662bd9bfbf8f4519683e57d2'});   // create item/document for model
          const addedItem = await newItem.save();                             // add item to the collection with the same model
//        const adds = await Add.find();
          res.json(addedItem);
//        req.io.emit('AddsUpdated', adds);
        } else {
          res.status(400).json({message: 'Missing request data...'})
        }
      }
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.updateItem = async (req, res) => {
    const { title, address, price, content, image } = req.body;
    try {
      const item = await Add.findById(req.params.id);   // check if item exist
      if(item) {
        await Add.updateOne({ _id: req.params.id }, { $set: { title, address, price, content, image }});
        const item = await Add.findById(req.params.id).populate('author'); 
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.deleteItem = async (req, res) => {
    try {
      const item = await Add.findById(req.params.id);
      if(item) {
        await Add.deleteOne({ _id: req.params.id });
        //  await department.remove();    // another way to remove item
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};