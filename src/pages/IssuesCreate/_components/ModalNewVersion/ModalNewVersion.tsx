import React, { useState } from "react";
import "~/pages/MyPage/_components/Dialog/Dialog.css";
import EnhanceSelect from "~/components/EnhanceSelect";
import Label from "~/components/Label";
import Input from "~/components/Input";
import DatePickerCustom from "~/components/DatePicker";
import Button from "~/components/Button";
import ErrorImg from "~/assets/images/error-img.png";

interface DialogProps {
  handleClick: (isVisible: boolean) => void;
}

const ModalNewVersion: React.FC<DialogProps> = ({ handleClick }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState<string>("");

  const [statusOptions, _setStatusOptions] = useState([
    { label: "open", value: "open" },
    { label: "locked", value: "locked" },
    { label: "closed", value: "closed" },
  ]);

  const handleClickOutside = () => {
    handleClick(false);
  };

  const [sharingOptions, _setSharinOptions] = useState([
    { label: "Not shared", value: "none" },
    { label: "With subprojects", value: "descendants" },
    { label: "With project hierarchy", value: "hierarchy" },
    { label: "With project tree", value: "tree" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

  const handleSubmit = () => {
    if (!name) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      <div className="w-[610px]  border  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fff] z-50">
        <div className="border py-1.5 px-2 flex justify-between rounded-md title_dialog items-center">
          <span className="font-bold text-[#fff] text-[13.2px] overflow-hidden whitespace-nowrap text-ellipsis">New version</span>
          <button
            className="w-5 h-5 icon_close bg-[#f6f6f6] px-2 rounded-sm border-[1px] border-[#ccc] hover:border-[#628db6]"
            onClick={handleClickOutside}
            title="Close"
          ></button>
        </div>
        {error && (
          <div className="pt-2 px-2">
            <div className="flex border-[#dd0000] items-center text-[13.2px] border-2 bg-[#ffe3e3] gap-3 p-[2px] mt-2 mb-3">
              <figure className="ml-2">
                <img src={ErrorImg} alt="error" />
              </figure>
              <span className="text-[#880000]">{`Name can't be blank`}</span>
            </div>
          </div>
        )}
        <form action="">
          <div className="px-3 py-1">
            <div className="bg-[#fcfcfc] w-full py-2 border">
              <div className="flex">
                <Label htmlFor="name" isRequired={true} className="flex gap-1 items-center p-0" name="Name"></Label>
                <Input id="name" style={{ width: "calc(100% - 225px)" }} className="ml-2" onChange={(e) => handleChange(e)} value={name} />
              </div>
              <div className="flex">
                <Label htmlFor="description" className="flex gap-1 items-center p-0" name="Description"></Label>
                <Input id="description" style={{ width: "calc(100% - 225px)" }} className="ml-2" />
              </div>
              <div className="flex">
                <Label htmlFor="status" className="flex gap-1 items-center p-0" name="Status"></Label>
                <EnhanceSelect
                  id="status"
                  className="text-[13.33px] font-normal text-[black] w-14 ml-2"
                  arrayOption={statusOptions}
                  defaultValue={"Bug"}
                />
              </div>
              <div className="flex">
                <Label htmlFor="wikiPage" className="flex gap-1 items-center p-0" name="Wiki page"></Label>
                <Input id="wikiPage" style={{ width: "calc(100% - 225px)" }} className="ml-2" />
              </div>
              <div className="flex">
                <Label htmlFor="StartDate" className="flex gap-1 items-center p-0" name="Start date"></Label>
                <DatePickerCustom id="StartDate" className="ml-2" />
              </div>
              <div className="flex">
                <Label htmlFor="sharing" className="flex gap-1 items-center p-0" name="Sharing"></Label>
                <EnhanceSelect
                  id="sharing"
                  className="text-[13.33px] font-normal text-[black] w-1/3 ml-2"
                  arrayOption={sharingOptions}
                  defaultValue={"none"}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end pt-1 pr-3 pb-2">
            <Button type="button" onClick={handleSubmit}>
              Create
            </Button>
            <Button type="button" onClick={handleClickOutside}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalNewVersion;
