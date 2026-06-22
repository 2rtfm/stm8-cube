import "@/index.css";
import { ChipDisplay } from "@/components/chip/ChipDisplay";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { STM8S103F3P6_TSSOP20 } from "@/data/chips/stm8s103f3p6";
import BaseLayout from "@/layouts/BaseLayout";

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
            <ChipDisplay chip={STM8S103F3P6_TSSOP20} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </BaseLayout>
  );
}

export default App;
