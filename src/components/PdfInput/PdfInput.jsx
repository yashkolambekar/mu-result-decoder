import { useEffect } from "react";
import { txtToString } from "../../utils/txtreader";
import { addPDFInput } from "../../slices/pdfSlice";
import { useDispatch, useSelector } from "react-redux";
import PdfInputPreview from "./PdfInputPreview/PdfInputPreview";

const PdfInput = () => {
  const dispatch = useDispatch();

  const pdfObj = useSelector((state) => state.pdf);
  const divider = useSelector(state => state.regex.divider);

  let enableUpload = false;

  if(divider){
    enableUpload = true;
  }

  async function handleFile(e) {
    try {
      const rtnData = await txtToString(e.target.files[0], divider);
      dispatch(addPDFInput(rtnData));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // console.log(pdfObj);
    const pretty = txtContentsPrettify(pdfObj.input);
  }, [pdfObj.input]);

  const txtContentsPrettify = (array) => {
    // console.log("prettifyer working");
    let str = [];
    for (let i = 0; i < array.length; i++) {
      str.push(<li>{array[i]}</li>);
    }
    return str;
  };

  const matchRegex = (array, regex) => {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].test()) {
        arr.push();
      }
    }
  };

  return (
    <>
      <div className={`rounded-md ${enableUpload ? "" : "hidden"}`}>
        <label
          htmlFor="uploadFile1"
          className="bg-white text-black text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-black border-2 shadow-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 mb-2 fill-black"
            viewBox="0 0 32 32"
          >
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000"
            />
          </svg>
          Upload file
          <input type="file" id="uploadFile1" onInput={(e) => handleFile(e)} className="hidden"  />
          <p className="text-xs text-gray-400 mt-2">
            Only TXT files
          </p>
        </label>
      </div>

      <PdfInputPreview />
    </>
  );
};

export default PdfInput;
