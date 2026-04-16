class UIStore {
	gridFilter = $state<'peak' | 'sow' | 'garden'>('peak');
}

export const ui = new UIStore();
