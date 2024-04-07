const Joi =require('joi');
module.exports.listingSchema=Joi.object({
    listing:Joi.object(
        {
            title:Joi.string().required(),
            description:Joi.string().required(),
            country:Joi.string().required(),
            location:Joi.string().required(),
            price:Joi.number().required().min(0),
            image: Joi.string().empty('').default(null), // Disallow empty strings and set a default value if not provided

        }
    ).required()
});

module.exports.reviewSchema=Joi.object({
    reviews:Joi.object({
        rating:Joi.number().required(),
        comment:Joi.string().required()
    }).required()
})
