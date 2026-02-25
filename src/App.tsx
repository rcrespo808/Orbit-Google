/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Layout } from './components/layout/Layout';
import { MainView } from './components/MainView';
import { CommandPalette } from './components/ui/CommandPalette';

export default function App() {
  return (
    <Layout>
      <MainView />
      <CommandPalette />
    </Layout>
  );
}
