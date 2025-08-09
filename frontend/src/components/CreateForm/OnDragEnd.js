import { arrayMove } from "@dnd-kit/sortable";

function OnDragEnd(event, setFormFields) {
  const { active, over } = event;
  console.log(event);
  if (!over || active.id === over.id) {
    return;
  }
  setFormFields((prev) => {
    const oldIndex = prev.fields.findIndex(
      (field) => field.uuid === active.id.uuid
    );
    const newIndex = prev.fields.findIndex(
      (field) => field.uuid === over.id.uuid
    );
    console.log(oldIndex + " " + newIndex);
    const newFields = arrayMove(prev.fields, oldIndex, newIndex);

    console.log(newFields);

    return {
      ...prev,
      fields: newFields,
    };
  });
}

export default OnDragEnd;
