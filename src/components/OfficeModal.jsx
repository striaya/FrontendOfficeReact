import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function OfficeModal({ open, onClose, onSave, defaultValues}) {
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if(defaultValues) {
            reset(defaultValues);
        }else {
            reset({ city: "", phone: "", addressLine1: "", addressLine2: "", state: "", country:"", postalCode: "", territory: ""});
        }
    }, [defaultValues, reset]);

    if(!open) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 w-full max-w-md rounded">
                <h2 className="font-bold mb-4">
                    {defaultValues ? "Edit Office" : "Add Office"}
                </h2>

                <form onClick={handleSubmit((data) => {
                    console.log("Submit:", data);
                    onSave(data);
                })} className="space-y-3">
                    <input {...register("city")} placeholder="City" className="border p-2 w-full" />
                    <input {...register("phone")} placeholder="Phone" className="border p-2 w-full" />
                    <input {...register("addressLine1")} placeholder="Address" className="border p-2 w-full" />
                    <input {...register("addressLine2")} placeholder="Address" className="border p-2 w-full" />
                    <input {...register("state")} placeholder="state" className="border p-2 w-full" />
                    <input {...register("country")} placeholder="country" className="border p-2 w-full" />
                    <input {...register("postalCode")} placeholder="postalCode" className="border p-2 w-full" />
                    <input {...register("territory")} placeholder="territory" className="border p-2 w-full" />

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose}>Cancel</button>

                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) 
}