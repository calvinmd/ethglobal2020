import * as yup from "yup";

const schema = yup.object().shape({
  erc20: yup.array().of(
    yup.object().shape({
      contractAddress: yup.string().required(),
      quantity: yup.number().required(),
    }),
  ),
  erc721: yup.array().of(
    yup.object().shape({
      contractAddress: yup.string().required(),
      quantity: yup.number().nullable(),
      tokenIds: yup.array().of(
        yup.number(),
      ),
    }),
  ),
});

export default schema;
