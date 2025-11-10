import promptModel from "../models/prompt.model.js";

//try to handle all error
export const createPrompt = async (req, res) => {
    try {
    const { title, promptText, imageUrl, } = req.body;
    const newPrompt = new promptModel({ title, promptText, imageUrl});
    const savedPrompt = await newPrompt.save();

    return res.status(201).json({
      success: true,
      message: "Yay Success",
      savedPrompt
    });
  } catch (error) {
    console.error("Error creating prompt:", error);
    return res.status(500).json({
      success: false,
      message: "",
    });
  }
};

export const getAllPrompt = async (req, res) => {
  try {
    const prompts = await promptModel.find();
    
    return res.status(200).json({
      success: true,
      message: "Yay Success!",
      prompts
    });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return res.status(500).json({
      success: false,
      message: "",
    });
  }
};

export const getOnePrompt = async (req, res) => {
     try {
    const { id } = req.params;
    const prompt = await promptModel.findById(id);

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found" 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Prompt Successful" ,
      prompt
    });
    
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return res.status(500).json({
      success: false,
      message: "",
    });
  }
};

export const getFilterPrompt = async (req, res) => {
    //use MongoDB function
    try {
    const { title, createdBy } = req.query;
    const filter = {};

    if (title) {
      // case-insensitive regex search
      filter.title = { $regex: title, $options: "i" };
    }

    if (createdBy) {
      filter.createdBy = createdBy;
    }

    const prompts = await promptModel.find(filter);
    return res.status(200).json({
      success: true,
      message: "Yay Success",
      data: prompts
    });
  } catch (error) {
    console.error("Error filtering prompts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate image",
      data: null
    });
  }
};

export const updatePrompt = async (req, res) => {
    try {
    const { id } = req.params;
    const updatedPrompt = await promptModel.findByIdAndUpdate(id, req.body);

    if (!updatedPrompt) {
      return res.status(404).json({
      success: false,
      message: "Prompt not found",
    });
    }

    return res.status(200).json({
      success: true,
      message: "Yay Success",
    });

  } catch (error) {
    console.error("Error updating prompt:", error);
    return res.status(500).json({
      success: false,
      message: "",
    });
  }
};

export const deletePrompt = async (req, res) => {
    try {
    const { id } = req.params;
    const deletedPrompt = await promptModel.findByIdAndDelete(id);

    if (!deletedPrompt) {
      return res.status(404).json({
      success: false,
      message: "Prompt not found",
    });
    }

    return res.status(200).json({
      success: true,
      message: "Yay Success",
    });

  } catch (error) {
    console.error("Error deleting prompt:", error);
    return res.status(500).json({
      success: false,
      message: "",
    });
  }
};