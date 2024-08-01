import { Uri, editor } from "monaco-editor";
import { FileType, getFileType } from "../utils/ScriptTransformer";

export function getModel(hostname: string, filename: string) {
  return editor?.getModel(
    Uri.from({
      scheme: "file",
      path: `${hostname}/${filename}`,
    }),
  );
}

export function makeModel(hostname: string, filename: string, code: string) {
  const uri = Uri.from({
    scheme: "file",
    path: `${hostname}/${filename}`,
  });
  let language;
  const fileType = getFileType(filename);
  switch (fileType) {
    case FileType.PLAINTEXT:
      language = "plaintext";
      break;
    case FileType.JSON:
      language = "json";
      break;
    case FileType.JS:
    case FileType.JSX:
      language = "javascript";
      break;
    case FileType.TS:
    case FileType.TSX:
      language = "typescript";
      break;
    case FileType.NS1:
      language = "javascript";
      break;
    default:
      throw new Error(`Invalid file type: ${fileType}. Filename: ${filename}.`);
  }
  //if somehow a model already exist return it
  return editor.getModel(uri) ?? editor.createModel(code, language, uri);
}
