import React from 'react'
import { render, screen } from '@testing-library/react'
import { PENDING_TEXT, isPending, siteConfig } from '../../src/lib/site.config'
import { team } from '../../src/data/team'

// Mock TeamMemberCard since TheFreeForCharityTeam uses it
jest.mock('../../src/components/ui/TeamMemberCard', () => {
  return function MockTeamMemberCard({
    name,
    role,
  }: {
    name: string
    role: string
    linkedinUrl?: string
  }) {
    return (
      <div data-testid="team-member-card">
        <span>{name}</span>
        <span>{role}</span>
      </div>
    )
  }
})

import HomePage from '../../src/app/home-page'

describe('HomePage (app/home-page)', () => {
  it('should render without crashing', () => {
    render(<HomePage />)
  })

  it('should render TheFreeForCharityTeam component', () => {
    render(<HomePage />)
    // A pending (empty) roster shows the section with a placeholder instead.
    if (isPending('team') && team.length === 0) {
      expect(screen.getByText(`The ${siteConfig.name} Team`)).toBeInTheDocument()
      expect(screen.getByText(PENDING_TEXT)).toBeInTheDocument()
    } else {
      expect(screen.getAllByTestId('team-member-card').length).toBeGreaterThan(0)
    }
  })
})
