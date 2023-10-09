import defaultImg from "src/asset/defaultImg.png";

export function Text({ value }: { value: string | undefined }) {
  return <>{value}</>;
}

export function Img({ src }: { src: string | undefined }) {
  return <img src={src || defaultImg} alt="" />;
}

// export function Input({inputType, placeholder, value, formItemName}: any) {
//   return (
//     <>
//       <input
//         type={inputType}
//         placeholder={placeholder}
//         style={{width: "100%", height: "100%"}}
//         disabled
//         value={value}
//         checked={value}
//         name={formItemName}
//         onChange={() => {}}
//       />
//     </>
//   );
// }

// export function Button({value}: {value: string | undefined}) {
//   return <>{value}</>;
// }
