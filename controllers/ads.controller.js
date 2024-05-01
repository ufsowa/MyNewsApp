const Ad = require('../models/Ad.model');

const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
    try {
      res.json(await Ad.find().populate('author'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Ad.countDocuments();  //  count all items in collection
      const rand = Math.floor(Math.random() * count);
      const item = await Ad.findOne().skip(rand);  //  skip number of items from the collection
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const item = await Ad.findById(req.params.id).populate('author');   // no need ObjectId conversion, mongoose do it underneeth 
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addItem = async (req, res) => {
    console.log('Add: ', req.body, req.file);

    try {
      const { title, address, price,  content, publishedDate } = req.body;
      const image = req.file.filename;

      // check if Ad is already reserved
      const isReserved = await Ad.exists( { title } );
      if(isReserved){
        fs.unlinkSync(filePath)                                                         //  clear file from disk in case of error
        res.status(409).json({message: 'The title is already taken...'})
      } else {
        if( title && address && price && content && image && publishedDate) {
          const newItem = new Ad({ title, address, price, content, image, publishedDate, author: '662bd9bfbf8f4519683e57d2'});   // create item/document for model
          const addedItem = await newItem.save();                             // Ad item to the collection with the same model
//        const Ads = await Ad.find();
          res.json(addedItem);
//        req.io.emit('AdsUpdated', Ads);
        } else {
          fs.unlinkSync(filePath)                                                         //  clear file from disk in case of error
          res.status(400).json({message: 'Missing request data...'})
        }
      }
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.updateItem = async (req, res) => {
    console.log('Edit: ', req.body, req.file);

    try {
      const { title, address, price, content} = req.body;
      const image = req.file ? req.file.filename : undefined;
  
      const item = await Ad.findById(req.params.id);   // check if item exist
      if(item) {
        await Ad.updateOne({ _id: req.params.id }, { $set: { title, address, price, content, image }});
        const addedItem = await Ad.findById(req.params.id).populate('author'); 
        image && console.log('Remove edited: ', path.join(__dirname, '..', 'public', 'uploads', item.image));   // remove only when file exist TODO
        image && fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', item.image));                    //  clear file from disk in case of error
        res.json(addedItem);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.deleteItem = async (req, res) => {
    try {
      const item = await Ad.findById(req.params.id);
      if(item) {
        await Ad.deleteOne({ _id: req.params.id });
        //  await department.remove();    // another way to remove item
        fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', item.image));                 //  clear file from disk in case of error
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};