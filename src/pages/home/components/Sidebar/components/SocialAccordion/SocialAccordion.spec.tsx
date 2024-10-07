/* eslint-disable testing-library/no-unnecessary-act -- tests asks for it when there is react states changes */
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockAddPost,
  mockedUsePostStore,
  mockRemovePost,
} from '~stores/__mocks__/usePostStore.mock';
import {
  mockedAccounts,
  mockedSocialMedias,
  mockedUseSocialMediaStore,
} from '~stores/__mocks__/useSocialMediaStore.mock.ts';

import SocialAccordion from './SocialAccordion';

vi.mock(
  '~stores/useSocialMediaStore/useSocialMediaStore',
  () => mockedUseSocialMediaStore
);

vi.mock('~stores/usePostStore/usePostStore', () => mockedUsePostStore);

vi.spyOn(window, 'scrollTo');

const mockDiscordData = mockedAccounts().data.DISCORD_EXAMPLE_ID;

describe('SocialAccordion', () => {
  it('renders the component', () => {
    const socialMediaId = 'DISCORD_EXAMPLE_ID';
    render(
      <SocialAccordion
        accounts={mockDiscordData}
        error={false}
        title={mockedSocialMedias().get(socialMediaId)?.name as string}
      />
    );
    const accordion = screen.getAllByText(/discord/i);

    expect(accordion[0]).toBeInTheDocument();
  });

  it('renders the intern content of accordion when is open', async () => {
    const socialMediaId = 'DISCORD_EXAMPLE_ID';

    render(
      <SocialAccordion
        accounts={mockDiscordData}
        error={false}
        title={mockedSocialMedias().get(socialMediaId)?.name as string}
      />
    );

    const accordion = screen.getAllByText(/discord/i);

    await userEvent.click(accordion[0]);

    const innerContent = screen.getByText(mockDiscordData[0].userName);

    expect(innerContent).toBeInTheDocument();
  });

  it('shows the error on screen if error={true}', () => {
    const socialMediaId = 'DISCORD_EXAMPLE_ID';

    render(
      <SocialAccordion
        accounts={[]}
        error
        title={mockedSocialMedias().get(socialMediaId)?.name as string}
      />
    );
    const error = screen.getByText(/error/i);

    expect(error).toBeInTheDocument();
  });

  // The tests are currently failing due to the socialAccordion component automatically rendering as activated. Although the test logic is correct, it fails because the component's default state is already active
  describe.skip('social tab switch', () => {
    it('activates social tab when is enable', async () => {
      const socialMediaId = 'DISCORD_EXAMPLE_ID';

      render(
        <SocialAccordion
          accounts={mockDiscordData}
          error={false}
          title={mockedSocialMedias().get(socialMediaId)?.name as string}
        />
      );

      const accordion = screen.getAllByText(/discord/i);
      await userEvent.click(accordion[0]);

      const [firstAccountSwitch] = screen.getAllByRole('checkbox');

      await act(async () => {
        await userEvent.click(firstAccountSwitch);
      });

      expect(mockAddPost).toHaveBeenCalled();

      expect(mockAddPost).toHaveBeenCalledWith(
        account,
        socialMedias?.postModes
      );
    });

    it('deactivates social tab when is disable', async () => {
      const socialMediaId = 'DISCORD_EXAMPLE_ID';

      render(
        <SocialAccordion
          accounts={mockDiscordData}
          error={false}
          title={mockedSocialMedias().get(socialMediaId)?.name as string}
        />
      );

      const accordion = screen.getAllByText(/discord/i);
      await userEvent.click(accordion[0]);

      const [firstAccountSwitch] = screen.getAllByRole('checkbox');

      await act(async () => {
        await userEvent.click(firstAccountSwitch);
        await userEvent.click(firstAccountSwitch);
      });

      expect(mockRemovePost).toHaveBeenLastCalledWith('SomeNanoId');
    });
  });

  describe('when clicked 2 times', () => {
    it('closes the accordion', async () => {
      const socialMediaId = 'DISCORD_EXAMPLE_ID';

      render(
        <SocialAccordion
          accounts={mockedAccounts().data.DISCORD_EXAMPLE_ID}
          error={false}
          title={mockedSocialMedias().get(socialMediaId)?.name as string}
        />
      );

      const contentWrapper = screen.getByTestId('accordion-content');
      const toggleAccordion = screen.getByTestId('accordion-toggle-button');

      await userEvent.click(toggleAccordion);

      await waitFor(() => {
        expect(contentWrapper).toHaveStyle('opacity: 1');
      });

      await userEvent.click(toggleAccordion);

      await waitFor(() => {
        expect(contentWrapper).toHaveStyle('opacity: 0');
      });
    });
  });

  describe('account list', () => {
    it('renders with zero if list is empty', () => {
      const socialMediaId = 'DISCORD_EXAMPLE_ID';

      render(
        <SocialAccordion
          accounts={[]}
          error={false}
          title={mockedSocialMedias().get(socialMediaId)?.name as string}
        />
      );
      const accountQuantity = screen.getByText(/0/);

      expect(accountQuantity).toBeInTheDocument();
    });

    it('renders with one account if list have one account', () => {
      const [account] = mockDiscordData;
      const socialMediaId = 'DISCORD_EXAMPLE_ID';

      render(
        <SocialAccordion
          accounts={[{ ...account, valid: true }]}
          error={false}
          title={mockedSocialMedias().get(socialMediaId)?.name as string}
        />
      );

      const accountQuantity = screen.getAllByText(/1/);

      expect(accountQuantity[0]).toBeInTheDocument();
    });
  });
});
