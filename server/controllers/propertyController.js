import Property from "../models/propertyModel.js";

export const createProperty = async (req, res) => {
  console.log(req.body);
  const newProperty = await Property.create({
    ...req.body,
    user: req.user._id,
  });
  res.json(newProperty);
};

export const getProperty=async(req,res)=>{
     const filters = { user: req.user._id };
     const { transactionType, propertyType, price } = req.query;

     if (transactionType) filters.transactionType = transactionType;
     if (propertyType) filters.propertyType = propertyType;
     if (price) filters.price = { $lte: Number(price) };

     const properties = await Property.find(filters);
     res.json(properties);
}

export const updateProperty=async(req,res)=>{
    const updated = await Property.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(updated);
}

export const deletProperty=async(req,res)=>{
     await Property.deleteOne({ _id: req.params.id, user: req.user._id });
     res.json({ success: true });
}
