"""create table cases

Revision ID: a408ba95f098
Revises: 
Create Date: 2024-09-17 16:41:59.533259

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a408ba95f098'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('admins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=150), nullable=False),
    sa.Column('password', sa.String(length=150), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('clients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('phone_no', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('lawyers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('specialization', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('cases',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('date_opened', sa.DateTime(), nullable=True),
    sa.Column('date_closed', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('representation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('client_name', sa.String(), nullable=False),
    sa.Column('lawyer_id', sa.Integer(), nullable=False),
    sa.Column('lawyer_name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
    sa.ForeignKeyConstraint(['lawyer_id'], ['lawyers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('lawyer_cases',
    sa.Column('lawyer_id', sa.Integer(), nullable=False),
    sa.Column('lawyer_name', sa.String(), nullable=False),
    sa.Column('case_id', sa.Integer(), nullable=False),
    sa.Column('case_name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['case_id'], ['cases.id'], ),
    sa.ForeignKeyConstraint(['lawyer_id'], ['lawyers.id'], ),
    sa.PrimaryKeyConstraint('lawyer_id', 'case_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('lawyer_cases')
    op.drop_table('representation')
    op.drop_table('cases')
    op.drop_table('lawyers')
    op.drop_table('clients')
    op.drop_table('admins')
    # ### end Alembic commands ###
