export function Card() {
  return (
    <>
      <div className="w-56 h-48 p-5 rounded-md border border-white bg-default flex flex-col justify-between">
        <div>
          <h2 className="font-medium mb-2">Buying furniture</h2>
          <h3 className="text-sm text-secondary-text">
            Buying chair, desk, and a lamp
          </h3>
        </div>

        <div className="flex justify-between text-sm">
          <h4 className="flex flex-col items-center child:text-xs child:text-secondary-text gap-1">
            <span>Created at:</span>
            10/04/24
          </h4>
          <h4 className="flex flex-col items-center child:text-xs child:text-secondary-text gap-1">
            <span>Due date:</span>
            20/04/24
          </h4>
        </div>
      </div>
    </>
  );
}
