import "@/index.css";
import { ChipDisplay } from "@/components/chip/ChipDisplay";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BaseLayout from "@/layouts/BaseLayout";
import { PinChangeConfirmDialog } from "./components/chip/PinChangeConfirmDialog";

export function App() {
  return (
    <BaseLayout>
      <div className="h-full w-full p-2">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full w-full rounded-lg"
        >
          <ResizablePanel defaultSize="20%">
            <div className="flex h-full items-center justify-center p-2 border rounded-lg">
              <span className="font-semibold">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="20%">
            <div className="flex h-full items-center justify-center p-2 border rounded-lg">
              <span className="font-semibold">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="60%">
            <ChipDisplay />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <PinChangeConfirmDialog />
    </BaseLayout>
  );
}

export default App;
